import requests
import json
import datetime
import time

ENDPOINT="http://localhost:3000"

def test_can_call_endpoint():
    response = requests.get(ENDPOINT)
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

def test_create_user_by_admin():
    payload = {
    "username": "testuser",
    "email": "testuser@gmail.com",
    "password": "password"
    }

    with open('admin-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']
    response = requests.post(F"{ENDPOINT}/api/user/createuser",headers=headers, json=payload)

    print(response.json())
    assert response.status_code == 200

def test_create_admin_by_admin():
    payload = {
    "username": "testAdmin",
    "email": "testAdmin@gmail.com",
    "password": "password"
    }

    with open('admin-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']
    response = requests.post(F"{ENDPOINT}/api/user/createuser",headers=headers, json=payload)

    print(response.json())
    assert response.status_code == 200

def test_delete_admin_by_admin():
    payload = {
    "username": "testAdmin",
    "user_id": "testuserId"  
    }
    with open('admin-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']
    response = requests.post(F"{ENDPOINT}/api/user/deleteuser",headers=headers, json=payload)

    print(response.json())
    assert response.status_code == 200

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

def test_admin_logout():
    with open('admin-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']

    payload={
        "userId":"044ae3d8-e75d-4f7c-9b71-ded5114effad",
        "token":token['token']
    }
    response = requests.post(F"{ENDPOINT}/api/logout",headers=headers, json=payload)

    print(response.json())
    expires_at = datetime.datetime.now()-datetime.timedelta(seconds=60*60*24)
    token_data={
        'expires at':expires_at.strftime('%Y-%m-%d %H:%M:%S'),
    }
    with open('admin-token.json', 'w') as file:
        json.dump(token_data,file,indent=4)
        file.close()
    assert response.status_code == 200