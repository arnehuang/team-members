from rest_framework import generics
from rest_framework.generics import CreateAPIView, DestroyAPIView, RetrieveAPIView, UpdateAPIView

from .models import TeamMember
from .serializers import TeamMemberSerializer


class TeamMemberListView(generics.ListAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer


class TeamMemberDetailView(RetrieveAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    lookup_field = 'pk'


class TeamMemberCreateView(CreateAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer


class TeamMemberUpdateView(UpdateAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    lookup_field = 'pk'


class TeamMemberDeleteView(DestroyAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    lookup_field = 'pk'
