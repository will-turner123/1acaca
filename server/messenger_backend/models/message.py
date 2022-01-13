from django.db import models

from . import utils
from .conversation import Conversation, Member


class Message(utils.CustomModel):
    text = models.TextField(null=False)
    senderId = models.IntegerField(null=False)
    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        db_column="conversationId",
        related_name="messages",
        related_query_name="message"
    )
    createdAt = models.DateTimeField(auto_now_add=True, db_index=True)
    updatedAt = models.DateTimeField(auto_now=True)
    read_by = models.ManyToManyField(
        Member,
        on_delete=models.CASCADE,
        related_name="readers",
        related_query_name="reader"
        )