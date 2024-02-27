package amk.Barprogramm.Services;

import amk.Barprogramm.Documents.Bardienst;
import amk.Barprogramm.Documents.Benutzer;
import amk.Barprogramm.Repositories.BenutzerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    public List<Benutzer> getAlleBenutzer() {
        return benutzerRepository.findAll();
    }

    public Benutzer deleteBenutzer(String zimmer, String name) {
        Benutzer b = benutzerRepository.findByZimmerAndName(zimmer, name).get();
        //delete all Bardienste of Benutzer
        List<Bardienst> bardienste = b.getBardienste();
        for(Bardienst bardienst : bardienste){
            mongoTemplate.remove(bardienst);
        }
        return benutzerRepository.deleteByZimmerAndName(zimmer, name);
    }

    public Benutzer updateBenutzer(String zimmer, String name, String alteNummer) {
        Benutzer b = benutzerRepository.findByZimmerAndName(alteNummer, name).get();
        b.setZimmer(zimmer);
        return benutzerRepository.save(b);
    }
}
