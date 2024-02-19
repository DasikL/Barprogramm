package amk.Barprogramm;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "benutzer")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Benutzer {
    @Id
    private ObjectId id;
    private String name;
    private String zimmer;
    @DocumentReference
    private List<Bardienst> bardienste;

    public List<Bardienst> getBardienste() {
        return bardienste;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
}
