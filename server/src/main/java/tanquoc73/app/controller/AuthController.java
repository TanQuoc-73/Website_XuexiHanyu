package tanquoc73.app.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import tanquoc73.app.dto.AuthRequest;
import tanquoc73.app.dto.AuthResponse;
import tanquoc73.app.dto.RegisterRequest;
import tanquoc73.app.entity.User;
import tanquoc73.app.repository.UserRepository;
import tanquoc73.app.security.JwtService;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
        public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
                String email = request.getEmail().trim().toLowerCase();
                String username = request.getUsername().trim();

                if (!StringUtils.hasText(username)) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username is required");
                }

                if (userRepository.findByEmail(email).isPresent()) {
                        throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
                }

        var user = User.builder()
                                .username(username)
                                .email(email)
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() != null ? request.getRole() : "ROLE_USER")
                .createdAt(LocalDateTime.now())
                .build();
        
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);

                return ResponseEntity.ok(toAuthResponse(user, jwtToken));
    }

    @PostMapping("/login")
        public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
                String email = request.getEmail().trim().toLowerCase();

                try {
                        authenticationManager.authenticate(
                                        new UsernamePasswordAuthenticationToken(email, request.getPassword())
                        );
                } catch (AuthenticationCredentialsNotFoundException ex) {
                        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
                }

                var user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));
        var jwtToken = jwtService.generateToken(user);

                return ResponseEntity.ok(toAuthResponse(user, jwtToken));
        }

        @PostMapping("/logout")
        public ResponseEntity<Map<String, String>> logout() {
                return ResponseEntity.ok(Map.of("message", "Logged out"));
        }
        
        private AuthResponse toAuthResponse(User user, String jwtToken) {
                return AuthResponse.builder()
                .token(jwtToken)
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .role(user.getRole())
                                .build();
    }
}
