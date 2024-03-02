package amk.Barprogramm.Services;

import amk.Barprogramm.Documents.Produkt;
import amk.Barprogramm.Repositories.ProduktRepository;
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

    public List<Produkt> getAlleProdukte() {
        return produktRepository.findAll();
    }

    public List<Integer> getProduktIds() {
        List<Integer> list = new ArrayList<Integer>();
        for (Produkt p : produktRepository.findByAktiv(true)) {
            list.add(p.getProduktId());
        }
        return list;
    }

    public Produkt createProdukt(Produkt produkt) {
        int id = (produktRepository.findAll().get(produktRepository.findAll().size()-1).getProduktId()) +1;
        produkt.setProduktId(id);
        return produktRepository.insert(produkt);
    }

    public Produkt changeProdukt(Produkt produkt) {
        mongoTemplate.update(Produkt.class)
                .matching(Criteria.where("produktId").is(produkt.getProduktId()))
                .apply(new Update().set("bestand", produkt.getBestand()))
                .first();
        mongoTemplate.update(Produkt.class)
                .matching(Criteria.where("produktId").is(produkt.getProduktId()))
                .apply(new Update().set("preis", produkt.getPreis()))
                .first();
        mongoTemplate.update(Produkt.class)
                .matching(Criteria.where("produktId").is(produkt.getProduktId()))
                .apply(new Update().set("aktiv", produkt.isAktiv()))
                .first();
        mongoTemplate.update(Produkt.class)
                .matching(Criteria.where("produktId").is(produkt.getProduktId()))
                .apply(new Update().set("bild", produkt.getBild()))
                .first();
        return produkt;
    }

    public Produkt deleteProdukt(int produktId) {
        Produkt p = produktRepository.findByProduktId(produktId);
        return produktRepository.deleteByProduktId(produktId);
    }

    public Produkt getProduktById(int produktId) {
        return produktRepository.findByProduktId(produktId);
    }
}
