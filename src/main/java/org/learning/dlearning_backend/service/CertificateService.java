package org.learning.dlearning_backend.service;

import org.learning.dlearning_backend.dto.request.CertificateCreationEvent;
import org.learning.dlearning_backend.dto.response.CertificateResponse;

import java.util.List;

public interface CertificateService {
    void createCertificate(CertificateCreationEvent event);
    List<CertificateResponse> getCertificateByCurrentLogin();
}
