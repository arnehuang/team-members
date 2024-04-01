from django.test import TestCase
from django.urls import reverse
import json


class TeamMemberViewTestCase(TestCase):
    def test_team_member_list_view(self):
        # Make a GET request to the TeamMemberListView endpoint
        response = self.client.get(reverse("team_members:team_member_list"))

        # Check that the response status code is 200 OK
        self.assertEqual(response.status_code, 200)

        # Check that the response content type is JSON
        self.assertEqual(response["Content-Type"], "application/json")

        # Load the JSON data from the response
        data = json.loads(response.content)

        # Check that the JSON data has the expected structure
        self.assertIn("count", data)
        self.assertIn("next", data)
        self.assertIn("previous", data)
        self.assertIn("results", data)

        # Check that the 'results' key contains a list of team members
        self.assertIsInstance(data["results"], list)

        # Check the structure of each team member object in the 'results' list
        for team_member in data["results"]:
            self.assertIn("id", team_member)
            self.assertIn("first_name", team_member)
            self.assertIn("last_name", team_member)
            self.assertIn("phone_number", team_member)
            self.assertIn("email", team_member)
            self.assertIn("role", team_member)
            self.assertIn("created_at", team_member)
            self.assertIn("updated_at", team_member)
