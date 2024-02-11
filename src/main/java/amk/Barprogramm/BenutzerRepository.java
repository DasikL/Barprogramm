package amk.Barprogramm;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BenutzerRepository extends MongoRepository<Benutzer, ObjectId> {
    Optional<Benutzer> findByZimmer(String zimmer);
}
