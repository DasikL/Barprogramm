package amk.Barprogramm.Repositories;

import amk.Barprogramm.Documents.Benutzer;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BenutzerRepository extends MongoRepository<Benutzer, ObjectId> {
    Optional<Benutzer> findByZimmer(String zimmer);
    Optional<Benutzer> findByZimmerAndName(String zimmer, String name);
}
