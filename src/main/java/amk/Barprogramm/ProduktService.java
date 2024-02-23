package amk.Barprogramm;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    public Boolean changeAktiv(int produktId, boolean aktiv) {
        mongoTemplate.update(Produkt.class)
                .matching(Criteria.where("produktId").is(produktId))
                .apply(new Update().set("aktiv", aktiv))
                .first();
        return aktiv;
    }

    public Float changePreis(int produktId, float preis) {
        mongoTemplate.update(Produkt.class)
                .matching(Criteria.where("produktId").is(produktId))
                .apply(new Update().set("preis", preis))
                .first();
        return preis;
    }

    public String changeBild(int produktId, String pfad) {
        mongoTemplate.update(Produkt.class)
                .matching(Criteria.where("produktId").is(produktId))
                .apply(new Update().set("bild", pfad))
                .first();
        return pfad;
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
}
