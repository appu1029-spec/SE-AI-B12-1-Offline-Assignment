# 1. Start from a small official Python image
FROM python:3.11-slim

# 2. All following commands run inside this folder
WORKDIR /app

# 3. Copy ONLY requirements first - this makes rebuilds much faster
COPY requirements.txt .

# 4. Install the Python packages
RUN pip install --no-cache-dir -r requirements.txt

# 5. Now copy the rest of the source code
COPY . .

# 6. Document which port the app listens on
EXPOSE 8000

# 7. The command that starts the app when the container runs
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]