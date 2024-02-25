package amk.Barprogramm.Repositories;

import amk.Barprogramm.Documents.Geld;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeldRepository extends MongoRepository<Geld, ObjectId>{
}
