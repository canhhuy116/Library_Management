# Library_Management
Readme hướng dẫn build dự án 
1. Back-end 
	Có 2 cách để build back end: 
	a. Build thủ công 
		Bước 1: Dùng hệ quản trị cơ sở dữ liệu mysql, sau đó kết nổi port 3306, 
		các thông tin cân thiết để access với database nằm trong file .env 
		Bước 2: Sau khi kết nối với database, tạo môi trường cho python và active nó, 
		sau đó pip install -r requirements.txt 
		Bước 3: Tạo máy chủ uvicorn: Từ thư mục back-end, gõ lệnh: 
				uvicorn app:main --reload 
	b. Build bằng script 
		Tải docker tạo container mysql, sau đó sh file create_db.sh và create_env.sh, 
		để khởi tạo các dependancy. Cuối cùng khởi tạo máy chủ uvicorn như bước trên
		
2. Front end 
	 Thực hiện các cmd: 
	 	npm install : để cài các dependancy 
	 	npm start
   
