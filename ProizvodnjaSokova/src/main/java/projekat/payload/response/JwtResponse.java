package projekat.payload.response;

import java.util.List;

public class JwtResponse {
	private String token;
	
	public JwtResponse(String jwt) {
		super();
		this.token = jwt;
	}

	public String getJwt() {
		return token;
	}

	public void setJwt(String jwt) {
		this.token = jwt;
	}	
}
