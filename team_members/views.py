from django.core.exceptions import FieldError
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
    serializer_class = TeamMemberSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        queryset = TeamMember.objects.all()
        search_query = self.request.query_params
        try:
            if search_query:
                filters = self.parse_search_query(search_query)
                if filters:
                    queryset = queryset.filter(**filters)
        except FieldError:
            raise ValidationError(f"Bad query: {self.request.query_params}. "
                                  f"Acceptable keys include email, first_name, id, last_name, phone_number, role")
        return queryset

    # query e.g. /api/?email__icontains=john&role=admin
    def parse_search_query(self, search_query):
        filters = {}
        for key, value in search_query.items():
            if '__' in key:
                filters[key] = value
            else:
                filters[key] = value
        return filters


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
