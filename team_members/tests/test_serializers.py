from django.test import TestCase
from ..models import TeamMember
from ..serializers import TeamMemberSerializer


class TeamMemberSerializerTestCase(TestCase):
    def test_serializer_fields(self):
        # Create a TeamMember instance for testing
        team_member_data = {
            "first_name": "John",
            "last_name": "Doe",
            "phone_number": "1234567890",
            "email": "john.doe@example.com",
            "role": "admin",
            "created_at": "2022-01-01T12:00:00Z",
            "updated_at": "2022-01-01T12:00:00Z",
        }
        team_member = TeamMember.objects.create(**team_member_data)

        # Create a serializer instance for the TeamMember object
        serializer = TeamMemberSerializer(instance=team_member)

        # Check that the serializer has the expected fields
        expected_fields = [
            "id",
            "first_name",
            "last_name",
            "phone_number",
            "email",
            "role",
            "created_at",
            "updated_at",
        ]
        self.assertEqual(set(serializer.fields.keys()), set(expected_fields))

        # Check the data returned by the serializer
        serialized_data = serializer.data
        self.assertEqual(serialized_data["first_name"], team_member_data["first_name"])
        self.assertEqual(serialized_data["last_name"], team_member_data["last_name"])
        self.assertEqual(
            serialized_data["phone_number"], team_member_data["phone_number"]
        )
        self.assertEqual(serialized_data["email"], team_member_data["email"])
        self.assertEqual(serialized_data["role"], team_member_data["role"])
        self.assertEqual(serialized_data["created_at"], team_member_data["created_at"])
