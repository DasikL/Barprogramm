package amk.Barprogramm.Repositories;

import amk.Barprogramm.Documents.Produkt;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProduktRepository extends MongoRepository<Produkt, ObjectId> {
    List<Produkt> findByAktiv(boolean aktiv);

    Produkt findByProduktId(int produktId);

    Produkt deleteByProduktId(int produktId);
}
