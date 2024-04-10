# Task API

The project is a task API built in Python 3.12.2. In this API, users can register, log in, and log out. Users can retrieve a user by ID and delete a user by ID. When deleting a user, all tasks created by that user are also deleted.

Users can create tasks, retrieve a task by ID (only tasks created by the logged-in user), mark tasks as completed, filter tasks by completed and uncompleted, delete a task by ID, and modify tasks.

## Installation
1. Create a virtual environment using `python -m venv venv`.
2. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS and Linux: `source venv/bin/activate`
3. Install project dependencies using `pip install -r requirements.txt`.

## Execution

Once the dependencies are installed, you can run the project with the following command:
remember you can change the port as you wish.

```bash
uvicorn main:app --reload --port 8000
