from django.test import TestCase
from rest_framework.exceptions import ValidationError

from ..models import TeamMember


class TeamMemberModelTestCase(TestCase):
    def test_create_teammember(self):
        member = TeamMember.objects.create(
            first_name="John",
            last_name="Doe",
            email="john.doe@example.com",
            role="admin",
            phone_number="123123123123",
        )
        self.assertEqual(member.first_name, "John")
        self.assertEqual(member.last_name, "Doe")
        self.assertEqual(member.email, "john.doe@example.com")
        self.assertEqual(member.role, "admin")
        self.assertEqual(member.phone_number, "123123123123")

    def test_validate_delete_last_admin(self):
        # Create an admin TeamMember
        admin_member = TeamMember.objects.create(
            first_name="Admin",
            last_name="User",
            phone_number="1234567890",
            email="admin@example.com",
            role="admin",
        )

        # Try to delete the admin TeamMember
        with self.assertRaises(ValidationError) as context:
            admin_member.delete()

        self.assertEqual(
            str(context.exception.detail[0]), "Cannot delete the last admin TeamMember."
        )

    def test_validate_last_admin(self):
        # Create an admin TeamMember
        admin_member = TeamMember.objects.create(
            first_name="Admin",
            last_name="User",
            phone_number="1234567890",
            email="admin@example.com",
            role="admin",
        )

        # Try to change the role of the admin TeamMember to regular
        with self.assertRaises(ValidationError) as context:
            admin_member.role = "regular"
            admin_member.save()

        self.assertEqual(
            str(context.exception.detail[0]),
            "Cannot change the role of the last admin TeamMember.",
        )

    def test_validate_phone_number(self):
        # Create a TeamMember with an invalid phone number
        invalid_member = TeamMember(
            first_name="Invalid",
            last_name="User",
            phone_number="abcdef",
            email="invalid@example.com",
            role="regular",
        )

        # Try to save the TeamMember
        with self.assertRaises(ValidationError) as context:
            invalid_member.save()

        self.assertEqual(
            str(context.exception.detail[0]),
            "Phone number must contain only numbers and be longer than 10 digits.",
        )

        # Create a TeamMember with a valid phone number
        valid_member = TeamMember(
            first_name="Valid",
            last_name="User",
            phone_number="1234567890",
            email="valid@example.com",
            role="regular",
        )

        # Saving the valid TeamMember should not raise any validation error
        valid_member.save()

        # Query the saved valid TeamMember to verify
        saved_member = TeamMember.objects.get(email="valid@example.com")
        self.assertEqual(saved_member.first_name, "Valid")
        self.assertEqual(saved_member.phone_number, "1234567890")
