from rest_framework import serializers
from .models import Category, Tag, Event


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):

    category = serializers.SlugRelatedField(read_only=True, slug_field="name")
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")

    organizer = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = "__all__"

    def get_organizer(self, obj):
        return obj.organizer.user.username


class RSVPSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"
