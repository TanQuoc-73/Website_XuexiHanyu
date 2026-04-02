package tanquoc73.app.service;

import java.time.LocalDateTime;
import java.util.List;

import tanquoc73.app.entity.User;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tanquoc73.app.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User createUser(User user){
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
}
