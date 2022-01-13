from django.db import models

from . import utils
from .conversation import Conversation, User


class Member(utils.CustomModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        db_column="conversationId",
        related_name="members",
        related_query_name="member"
    )
    createdAt = models.DateTimeField(auto_now_add=True, db_index=True)
    updatedAt = models.DateTimeField(auto_now=True)