package amk.Barprogramm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.lang.Integer.parseInt;

@Service
public class BardienstService {

    @Autowired
    private BardienstRepository bardienstRepository;
    @Autowired
    private BenutzerRepository benutzerRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Bardienst> getAlleBardienste() {
        return bardienstRepository.findAll();
    }

    public Bardienst createBardienst(Bardienst bardienst) {

        bardienstRepository.insert(bardienst);
        mongoTemplate.update(Benutzer.class)
                .matching(Criteria.where("zimmer").is(bardienst.getZimmer()))
                .apply(new Update().push("bardienste").value(bardienst))
                .first();


        for (int i = 0; i < bardienst.getEndbestand().size(); i++) {
            int produkt = parseInt((String) bardienst.getEndbestand().keySet().toArray()[i]);
            int endbestand = (int) bardienst.getEndbestand().values().toArray()[i];
            mongoTemplate.update(Produkt.class)
                    .matching(Criteria.where("produktId").is(produkt))
                    .apply(new Update().set("bestand", endbestand))
                    .first();
        }
        return bardienst;
    }


    public Optional<List<Bardienst>> getBardiensteByZimmer(String zimmer) {
        Benutzer b = benutzerRepository.findByZimmer(zimmer).orElse(null);
        return Optional.ofNullable(b.getBardienste());
    }
}