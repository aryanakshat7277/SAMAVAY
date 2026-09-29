package org.sih.samavay.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI samavayOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("SAMAVAY Digital Public Infrastructure API")
                        .description("Unified Interoperability and Government Digital Services Platform (SIH26129)")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("SAMAVAY SIH Architectural Team")
                                .email("contact@samavay.gov.in")
                                .url("https://samavay.gov.in"))
                        .license(new License()
                                .name("Government Open Technology License")
                                .url("https://samavay.gov.in/license")))
                .addSecurityItem(new SecurityRequirement().addList("BearerAuth"))
                .components(new io.swagger.v3.oas.models.Components()
                        .addSecuritySchemes("BearerAuth", new SecurityScheme()
                                .name("BearerAuth")
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")));
    }
}
