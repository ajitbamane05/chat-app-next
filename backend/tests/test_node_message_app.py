import requests
import json
import datetime
import time
import logging

logging.basicConfig(level=logging.DEBUG)

ENDPOINT="https://chat-app-pro.site"

def test_can_call_endpoint():
    response = requests.get(ENDPOINT)
    assert response.status_code == 200

def load_token(file):
    with open(file) as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']
    return headers

def make_request(endpoint,headers,payload,expected_status):
    response= requests.post(F"{ENDPOINT}{endpoint}", headers=headers, json=payload)
    print(response.json())
    assert response.status_code == expected_status

def test_user_login():
    payload={
    "username":"Peter",
    "password":"password"
    }
    with open('user-token.json') as infile:
        token = json.load(infile)
    expiry=datetime.datetime.strptime(token['expires at'], '%Y-%m-%d %H:%M:%S')
    if expiry > datetime.datetime.now():
        assert True
    else:
        response = requests.post(F"{ENDPOINT}/api/login", json=payload)
        current_time = datetime.datetime.now()
        expires_at = current_time + datetime.timedelta(seconds=60*60*24)
        token = response.headers['authorization']
        token_data = {
            'issued at':current_time.strftime('%Y-%m-%d %H:%M:%S'),
            'expires at':expires_at.strftime('%Y-%m-%d %H:%M:%S'),
            'token':token
        }
        with open('user-token.json','w') as file:
            json.dump(token_data, file, indent=4)
            file.close()
        time.sleep(0.1)
        assert response.status_code == 200

def test_login_admin():
    payload={
    "username":"Admin",
    "password":"password"
    }
    with open('admin-token.json') as infile:
        token = json.load(infile)
    expiry=datetime.datetime.strptime(token['expires at'], '%Y-%m-%d %H:%M:%S')
    if expiry > datetime.datetime.now():
        assert True
    else:
        response = requests.post(F"{ENDPOINT}/api/login", json=payload)
        current_time = datetime.datetime.now()
        expires_at = current_time + datetime.timedelta(seconds=60*60*24)
        token = response.headers['authorization']
        token_data = {
            'issued at':current_time.strftime('%Y-%m-%d %H:%M:%S'),
            'expires at':expires_at.strftime('%Y-%m-%d %H:%M:%S'),
            'token':token
        }
        with open('admin-token.json','w') as file:
            json.dump(token_data, file, indent=4)
            file.close()
        time.sleep(0.1)
        assert response.status_code == 200


def test_create_user_by_user():
    payload = {
    "username": "sid",
    "email": "sid@gmail.com",
    "password": "password"
    }
    headers=load_token('user-token.json')
    make_request('/api/user/createuser',headers,payload,401)
   

def test_get_room_memberships_of_user():
    payload = {
        "userId":"087b4134-ce61-43f2-9087-90db12631879"
    }
    headers=load_token('user-token.json')
    make_request('/api/room/getmembership',headers,payload,200)

def test_create_user_by_admin():
    payload = {
    "username": "testuser",
    "email": "testuser@gmail.com",
    "password": "password"
    }
    headers=load_token('admin-token.json')
    make_request('/api/user/createuser',headers,payload,200)

def test_create_admin_by_admin():
    payload = {
    "username": "testAdmin",
    "email": "testAdmin@gmail.com",
    "password": "password"
    }
    headers=load_token('admin-token.json')
    make_request('/api/user/createuser',headers,payload,200)
    

def test_delete_admin_by_user():
    payload = {
    "username": "testAdmin",
    "user_id": "userId"  
    }
    headers=load_token('admin-token.json')
    make_request('/api/user/deleteuser',headers,payload,401)


def test_delete_admin_by_admin():
    payload = {
    "username": "testAdmin",
    "user_id": "testuserId"  
    }
    headers=load_token('admin-token.json')
    make_request('/api/user/deleteuser',headers,payload,200)

def test_delete_user_by_admin():
    payload = {
    "username": "testuser",
    "user_id": "testuserId"  
    }
    with open('admin-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']
    response = requests.post(F"{ENDPOINT}/api/user/deleteuser",headers=headers, json=payload)

    print(response.json())
    assert response.status_code == 200

def test_send_message_by_different_sender_id():
    payload = {
    "content": "Long Time no see",
    "senderId": "297fe06c-af86-44d4-8414-2bd4881e934a",
    "roomId": "8f582f3d-d046-41f8-b6fb-795163167863" 
    }   
    with open('user-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']

    response = requests.post(F"{ENDPOINT}/api/chat/sendmessage",headers=headers, json=payload)

    print(response.json())
    assert response.status_code == 401

def test_send_message_by_loggedin_user():
    payload = {
    "content": "Long Time no see",
    "senderId": "087b4134-ce61-43f2-9087-90db12631879",
    "roomId": "8f582f3d-d046-41f8-b6fb-795163167863"
    }   
    with open('user-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']

    response = requests.post(F"{ENDPOINT}/api/chat/sendmessage",headers=headers, json=payload)

    print(response.json())
    assert response.status_code == 200


def test_get_chat_of_room():
    payload={
    "roomId":"8f582f3d-d046-41f8-b6fb-795163167863"
    }
    with open('user-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']

    response = requests.post(F"{ENDPOINT}/api/chat/getchat",headers=headers, json=payload)

    print(response.json())
    assert response.status_code == 200

def test_admin_logout():
    with open('admin-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']
    payload={
        "userId":"9b844e6d-4a10-4c0a-b43b-cb385c5aed00",
        "token":token['token']
    }
    response = requests.post(F"{ENDPOINT}/api/logout",headers=headers, json=payload)

    print(response.json())
    expires_at = datetime.datetime.now()-datetime.timedelta(seconds=60*60*24)
    token_data={
        "expires at":expires_at.strftime('%Y-%m-%d %H:%M:%S'),
        "token":token['token']
    }
    with open('admin-token.json', 'w') as file:
        json.dump(token_data,file,indent=4)
        file.close()
    assert response.status_code == 200



def test_user_logout():
    with open('user-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']
    payload={
        "userId":"087b4134-ce61-43f2-9087-90db12631879",
        "token":token['token']
    }
    response = requests.post(F"{ENDPOINT}/api/logout",headers=headers, json=payload)
    print(response.json())
    expires_at = datetime.datetime.now()-datetime.timedelta(seconds=60*60*24)
    token_data={
        'expires at':expires_at.strftime('%Y-%m-%d %H:%M:%S'),
        'token': token['token']
    }
    with open('user-token.json', 'w') as file:
        json.dump(token_data,file,indent=4)
        file.close()
    assert response.status_code == 200








