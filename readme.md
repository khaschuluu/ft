Фурье хувиргалт
===============

Фурье хувиргалт (Fourier Transform цаашид FT) нь дуу, зураг, сигналд шинжилгээ, боловсруулалт хийхэд нэн чухал функц юм. Дискрет FT (DFT) нь компьютер дээр FT хийх боломж олгодог бөгөөд Хурдан DFT (FFT) нь DFT-г олон дахин хурдан хийх боломжтой алгоритм юм.


[Онлайн демо](https://khaschuluu.github.io/ft/)

Талархал
--------

Энэ төслийг анхлан хөгжүүлэх явцад математик, физикийн зөвлөгөө өгч туслалцсан [Гантөмөр](https://github.com/gantemur) ах болон [Орхонгуа](https://twitter.com/OrkhonguaB) хоёртоо гүн талархал илэрхийлж байна.

Хөгжүүлэгчдэд
-------------

Компьютер дээрээ шууд замыг нь вэб хөтчийнхөө хаяг дээр хуулаад тоглуулж болно. Гэвч `spectrogram_from_file.html` зэрэг гаднаас медиа файл дуудах үед `CORS restriction` гэсэн шалтгаанаар дууг тоглуулахгүй тул ямар нэг вэб сервер ашиглаж дуудна уу. Жишээ нь `sudo npm install --global http-server` гэсэн node.js сервер суулгаад, уг хавтсан дотор `http-server` гэж ажилуулаад `localhost:8080` гээд орж болно. Apache, nginx гээд өөрсдөд амар ямар сервер дээр туршиж болно.