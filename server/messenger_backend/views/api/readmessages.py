from django.contrib.auth.middleware import get_user
from django.http import HttpResponse, JsonResponse
from messenger_backend.models import Conversation
from rest_framework.views import APIView
from django.db.models import Q

class ReadMessages(APIView):
    """expects { conversationId } in body"""
    
    def post(self, request):
        try:
            user = get_user(request)
            user_id = user.id

            if user.is_anonymous:
                return HttpResponse(status=401)

            body = request.data
            conversation_id = body.get("conversationId")

            conversation = Conversation.objects.filter(id=conversation_id).first()
            unread_messages = conversation.messages.filter(~Q(id=user_id))
            unread_messages.update(read=True)

            data = {"conversationId": conversation_id}

            return JsonResponse(data)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)

