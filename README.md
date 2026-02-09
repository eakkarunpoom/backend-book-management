Document Book Management (TEST INNOVATEAI)

##SET UP##
1. clone repository
	1.1 https://github.com/eakkarunpoom/frontend-book-management (for frontend)
	1.2 https://github.com/eakkarunpoom/backend-book-management (for backend)
2. npm install both repository
3. create database name book-management
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
4. npm run start // npm run dev

##Document API##
1.[POST]/user/create 
	for createuser to database or signup process
	request body {
			userName: string,
			password: string
		}
2.[POST]/user/login
	for login
	request body {
		username: string,
		password: string
	}

3.[POST]/book/create
	for create book to database
	request header : Authorization
	request body {
    		title: string
    		author: string,
    		publishedYear: number,
    		genre: string
	}

4.[GET]/book/get
	for get all book 
	request header : Authorization

5.[GET]/book/get-book
	for get book by pagination 
	request header : Authorization
	request Query {
		page: number
		limit: number
	}

5.[PATCH]/book/update/:id
	for update book by id to database 
	request header : Authorization
	request body {
    		title: string
    		author: string,
    		publishedYear: number,
    		genre: string
	}

6.[DELETE]/book/delete/:id
	for delete book by id to database 
	request header : Authorization

