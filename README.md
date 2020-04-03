# Task Manager 1.0.0

task manager api build with node js and mongo db

## endpoint list

### main rout

1. "/" : welcome message

### authentication routes

1. "/auth/login" 
2. "/auth/signin" 
3. "/auth/logout" 
4. "/auth/logoutAll"

### user routes

1. "/user/me"
2. "/user/me" PUT methods
3. "/user/me" DELETE methods
4. "/user/:id/avatar" 

### avatar routes

1. "/user/me/avatar" POST 
2. "/user/me/avatar" DELETE

### task routes

1. "/task" POST
2. "/task/:id" PUT
3. "/tasks" || "/tasks?limit=2&skip=4" || /tasks?sortBy=createdAt:(asc | desc)
4. "task/:id" GET
5. "/task/:id" DELETE

