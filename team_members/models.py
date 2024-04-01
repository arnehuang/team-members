from rest_framework.exceptions import ValidationError
from django.core.validators import EmailValidator
from django.db import models
from django.utils import timezone


class TeamMember(models.Model):
    ROLE_CHOICES = [
        ('regular', 'Regular'),
        ('admin', 'Admin'),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(unique=True, validators=[EmailValidator(message='Invalid email format.')])
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='regular')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"

    def validate_delete_last_admin(self):
        if self.role == 'admin' and TeamMember.objects.filter(role='admin').count() == 1:
            raise ValidationError("Cannot delete the last admin TeamMember.")

    def validate_last_admin(self):
        if self.pk is not None and self.role == 'regular' and TeamMember.objects.filter(role='admin').count() == 1:
            if self._state.adding is False and self.role != self.__class__.objects.get(pk=self.pk).role:
                raise ValidationError("Cannot change the role of the last admin TeamMember.")

    def validate_phone_number(self):
        if not self.phone_number.isdigit() or len(self.phone_number) < 10:
            raise ValidationError("Phone number must contain only numbers and be longer than 10 digits.")

    def clean(self):
        self.validate_phone_number()
        self.validate_last_admin()

    def save(self, *args, **kwargs):
        self.full_clean()  # Call clean() method before saving
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.validate_delete_last_admin()  # Validate before deletion
        super().delete(*args, **kwargs)

    class Meta:
        app_label = 'team_members'
