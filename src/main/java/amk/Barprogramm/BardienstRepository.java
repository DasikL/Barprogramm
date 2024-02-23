package amk.Barprogramm;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BardienstRepository extends MongoRepository<Bardienst, ObjectId> {
    List<Bardienst> findByDatum(String datum);
}
