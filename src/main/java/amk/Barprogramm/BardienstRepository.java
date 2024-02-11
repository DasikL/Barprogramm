package amk.Barprogramm;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BardienstRepository extends MongoRepository<Bardienst, ObjectId> {
}
