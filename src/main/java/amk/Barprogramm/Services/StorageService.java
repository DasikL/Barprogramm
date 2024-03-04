package amk.Barprogramm.Services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
public class StorageService {

    private static final String FOLDER_PATH;

    static {
        try {
            FOLDER_PATH = new File(".").getCanonicalPath() + "/uploads/";
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String uploadFile(MultipartFile file) throws IOException {
        File directory = new File(FOLDER_PATH);
        if (!directory.exists()) {
            directory.mkdir();
        }
        String filepath=FOLDER_PATH + file.getOriginalFilename();
        String filename = file.getOriginalFilename();
        file.transferTo(new java.io.File(filepath));
        return filename;
    }

    public byte[] downloadFile(String filename) throws IOException {
        byte[] image = Files.readAllBytes(new File(FOLDER_PATH + filename).toPath());
        return image;
    }

    public void deleteFile(String filename) throws IOException {
        Files.delete(new File(FOLDER_PATH + filename).toPath());
    }
}

