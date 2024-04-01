from django.urls import path

from .views import (
    TeamMemberCreateView,
    TeamMemberDeleteView,
    TeamMemberDetailView,
    TeamMemberListView,
    TeamMemberUpdateView,
)

app_name = "team_members"

urlpatterns = [
    path("", TeamMemberListView.as_view(), name="team_member_list"),
    path("add/", TeamMemberCreateView.as_view(), name="team_member_add"),
    path("<int:pk>/", TeamMemberDetailView.as_view(), name="team_member_detail"),
    path("<int:pk>/edit/", TeamMemberUpdateView.as_view(), name="team_member_edit"),
    path("<int:pk>/delete/", TeamMemberDeleteView.as_view(), name="team_member_delete"),
]
