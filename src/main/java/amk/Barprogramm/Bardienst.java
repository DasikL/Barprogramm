package amk.Barprogramm;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document(collection = "bardienste")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bardienst {

    @Id
    private ObjectId id;
    private String name;
    private String zimmer;
    private String datum;
    private String uhrzeit;
    private String kommentar;
    private Map<String, Integer> anfangsbestand;
    private Map<String, Integer> endbestand;

    public Bardienst(String name, String datum, String uhrzeit, String kommentar, Map<String, Integer> anfangsbestand, Map<String, Integer> endbestand) {
        this.name = name;
        this.datum = datum;
        this.uhrzeit = uhrzeit;
        this.kommentar = kommentar;
        this.anfangsbestand = anfangsbestand;
        this.endbestand = endbestand;


    }

    public Map<String, Integer> getEndbestand() {
        return endbestand;
    }

    public Object getZimmer() {
        return zimmer;
    }
}
