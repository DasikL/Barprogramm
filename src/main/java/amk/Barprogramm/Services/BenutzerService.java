package amk.Barprogramm.Services;

import amk.Barprogramm.Documents.Benutzer;
import amk.Barprogramm.Repositories.BenutzerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class BenutzerService {

    @Autowired
    private BenutzerRepository benutzerRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Benutzer createBenutzer(Benutzer benutzer) {
        return benutzerRepository.insert(benutzer);
    }

    public Boolean checkBenutzer(String zimmer, String name) {
        if(!benutzerRepository.findByZimmerAndName(zimmer, name).isPresent()){
            if(benutzerRepository.findByZimmer(zimmer).isPresent()){
                Benutzer b = benutzerRepository.findByZimmer(zimmer).get();
                if(b.getName().equalsIgnoreCase(name)){
                    return true;
                }
            }
            return false;
        };
        return true;
    }

}
