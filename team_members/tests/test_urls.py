from django.test import TestCase
from django.urls import reverse


class TeamMembersURLsTestCase(TestCase):
    def test_team_member_list_url(self):
        url = reverse("team_members:team_member_list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_team_member_add_url(self):
        url = reverse("team_members:team_member_add")
        response = self.client.get(url)
        self.assertEqual(
            response.status_code, 405
        )  # POST method not allowed, as it's a create view

    def test_team_member_edit_url(self):
        team_member_id = 1  # Assuming this is a valid TeamMember ID for testing
        url = reverse("team_members:team_member_edit", kwargs={"pk": team_member_id})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code, 405
        )  # PUT method not allowed, as it's an edit view

    def test_team_member_delete_url(self):
        team_member_id = 1  # Assuming this is a valid TeamMember ID for testing
        url = reverse("team_members:team_member_delete", kwargs={"pk": team_member_id})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code, 405
        )  # DELETE method not allowed, as it's a delete view
