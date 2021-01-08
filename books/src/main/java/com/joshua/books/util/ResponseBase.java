package com.joshua.books.util;

import java.io.Serializable;

public class ResponseBase implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String status;
	private String message;
	private Object response;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getResponse() {
		return response;
	}

	public void setResponse(Object response) {
		this.response = response;
	}

}
