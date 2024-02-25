package amk.Barprogramm.Documents;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "geld")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Geld {

    @Id
    private ObjectId id;
    private Double bestand;

    public Double getGeld() {
        return bestand;
    }
    public void setGeld(Double geld) {
        this.bestand = geld;
    }

    public ObjectId getId() {
        return id;
    }
}
