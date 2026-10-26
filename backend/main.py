import os
import platform
import socket
import time
from datetime import datetime, timezone

from fastapi import FastAPI

app = FastAPI(title="Deploy Dashboard API")

START_TIME = time.time()
visit_count = 0


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/info")
def info():
    global visit_count
    visit_count += 1
    return {
        "app": os.getenv("APP_NAME", "Deploy Dashboard"),
        "server_name": socket.gethostname(),
        "python_version": platform.python_version(),
        "uptime_seconds": int(time.time() - START_TIME),
        "server_time_utc": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "visits": visit_count,
    }