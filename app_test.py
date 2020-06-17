import pytest

from flask import json
import app

@pytest.fixture

def client():
    app.app.config['TESTING'] = True
    client = app.app.test_client()

    yield client

def test_root(client):
    rv = client.get('/')
    assert(rv.status_code == 200)
    assert(b'hello' in rv.data)