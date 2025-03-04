package org.learning.dlearning_backend.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CloudinaryService {
    private final Cloudinary cloudinary;
    private final UserRepository userRepository;

    @PreAuthorize("isAuthenticated()")
    public String uploadImage(MultipartFile file){
        try{
          var result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                  "folder","/upload",
                          "use_filename", true,
                          "unique_filename", true,
                          "resource_type", "auto"));
            return result.get("secure_url").toString();
        }catch (Exception e){
            log.error("Error while uploading image: ", e);
            throw new AppException(ErrorCode.UPLOAD_IMAGE_ERROR);
        }
    }
    public Map<String,Object> uploadVideo(MultipartFile file, String folderName) throws IOException {
        File tempFile = convertMultiPartFileToFile(file);
        Map<String,Object> uploadResult = cloudinary.uploader().upload(tempFile, ObjectUtils.asMap(
                "folder", folderName,
                "resource_type", "video",
                "chunk_size",6000000
        ));
        Files.delete(tempFile.toPath());
        
        return uploadResult;
    }
    private File convertMultiPartFileToFile(MultipartFile file) throws IOException {
        File convertedFile = File.createTempFile("upload", file.getOriginalFilename());
        file.transferTo(convertedFile);
        return convertedFile;
    }
}
