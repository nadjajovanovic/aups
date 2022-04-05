package projekat.models;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


/**
 * The persistent class for the pogon database table.
 * 
 */
@Entity
@NamedQuery(name="Pogon.findAll", query="SELECT p FROM Pogon p")
public class Pogon implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="POGON_POGONID_GENERATOR", sequenceName="POGON_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="POGON_POGONID_GENERATOR")
	private Integer pogonid;

	private String oznakap;

	//bi-directional many-to-one association to Radnik
	@JsonIgnore
	@OneToMany(mappedBy="pogon")
	private List<Radnik> radniks;

	public Pogon() {
	}

	public Integer getPogonid() {
		return this.pogonid;
	}

	public void setPogonid(Integer pogonid) {
		this.pogonid = pogonid;
	}

	public String getOznakap() {
		return this.oznakap;
	}

	public void setOznakap(String oznakap) {
		this.oznakap = oznakap;
	}

	public List<Radnik> getRadniks() {
		return this.radniks;
	}

	public void setRadniks(List<Radnik> radniks) {
		this.radniks = radniks;
	}

	public Radnik addRadnik(Radnik radnik) {
		getRadniks().add(radnik);
		radnik.setPogon(this);

		return radnik;
	}

	public Radnik removeRadnik(Radnik radnik) {
		getRadniks().remove(radnik);
		radnik.setPogon(null);

		return radnik;
	}

}