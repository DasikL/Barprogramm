package amk.Barprogramm.Controller;

import amk.Barprogramm.Services.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@CrossOrigin
@RequestMapping("/storage")
public class StorageController {

    @Autowired
    private StorageService storageService;
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("image")MultipartFile file) throws IOException {
        return new ResponseEntity<String>(storageService.uploadFile(file), HttpStatus.OK);
    }

    @GetMapping("/download")
    public ResponseEntity<byte[]> downloadFile(@RequestParam("filename")String filename) throws IOException {
        byte[] image = storageService.downloadFile(filename);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.IMAGE_JPEG)
                .body(image);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteFile(@RequestParam("filename")String filename) throws IOException {
        storageService.deleteFile(filename);
        return new ResponseEntity<String>("File deleted", HttpStatus.OK);
    }
}

