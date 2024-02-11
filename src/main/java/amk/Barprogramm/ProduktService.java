package amk.Barprogramm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProduktService {

    @Autowired
    ProduktRepository produktRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Produkt> getAktiveProdukte() {
        return produktRepository.findByAktiv(true);
    }

    public List<Integer> getProduktIds() {
        List<Integer> list = new ArrayList<Integer>();
        for (Produkt p : produktRepository.findByAktiv(true)) {
            list.add(p.getProduktId());
        }
        return list;
    }

    public Produkt createProdukt(Produkt produkt) {
        produkt.setProduktId(produktRepository.findAll().size() + 1);
        return produktRepository.insert(produkt);
    }

    public Integer changeBestand(int produktId, int bestand) {

        mongoTemplate.update(Produkt.class)
                .matching(Criteria.where("produktId").is(produktId))
                .apply(new Update().set("bestand", bestand))
                .first();
        return bestand;
    }

}
