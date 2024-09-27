from rest_framework import serializers
from .models import Category, Tag, Event, RSVP
from members.models import UserProfile
from django.contrib.auth.models import User


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class OrganizerUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
        ]


class OrganizerProfileSerializer(serializers.ModelSerializer):
    user = OrganizerUserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ["user"]


class EventSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    organizer = OrganizerProfileSerializer(read_only=True)

    class Meta:
        model = Event
        fields = "__all__"


class RSVPEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "name",
            "date",
            "time",
            "location",
            "thumbnail",
        ]


class RSVPUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "email",
        ]


class RSVPAttendeeSerializer(serializers.ModelSerializer):
    user = RSVPUserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ["user", "image"]


class RSVPSerializer(serializers.ModelSerializer):
    event = RSVPEventSerializer(read_only=True)
    attendee = RSVPAttendeeSerializer(read_only=True)

    class Meta:
        model = RSVP
        fields = "__all__"
