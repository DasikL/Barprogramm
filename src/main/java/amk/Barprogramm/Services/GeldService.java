package amk.Barprogramm.Services;

import amk.Barprogramm.Documents.Geld;
import amk.Barprogramm.Repositories.GeldRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class GeldService {

    @Autowired
    private GeldRepository geldRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Double setGeld(Double geld) {
        mongoTemplate.update(Geld.class)
                .matching(Criteria.where("id").is(geldRepository.findAll().get(0).getId()))
                .apply(new Update().set("bestand", geld))
                .first();
        return geld;
    }

    public Double getGeld() {
        return geldRepository.findAll().get(0).getGeld();
    }

}
