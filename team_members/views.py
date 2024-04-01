from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView, DestroyAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .models import TeamMember
from .serializers import TeamMemberSerializer


class ValidationErrorMixin:
    def handle_validation_error(self, exc):
        return Response({'error': exc.detail}, status=status.HTTP_400_BAD_REQUEST)

    def handle_exception(self, exc):
        if isinstance(exc, ValidationError):
            return self.handle_validation_error(exc)
        return super().handle_exception(exc)


class TeamMemberListView(ValidationErrorMixin, ListAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    pagination_class = PageNumberPagination


class TeamMemberDetailView(ValidationErrorMixin, RetrieveAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    lookup_field = 'pk'


class TeamMemberCreateView(ValidationErrorMixin, CreateAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer


class TeamMemberUpdateView(ValidationErrorMixin, UpdateAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    lookup_field = 'pk'


class TeamMemberDeleteView(ValidationErrorMixin, DestroyAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    lookup_field = 'pk'
