package com.ebisaos.config;

import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.*;
import tech.jhipster.config.JHipsterProperties;
import tech.jhipster.config.cache.PrefixedKeyGenerator;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(
                Object.class,
                Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries())
            )
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build()
        );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.ebisaos.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.ebisaos.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.ebisaos.domain.User.class.getName());
            createCache(cm, com.ebisaos.domain.Authority.class.getName());
            createCache(cm, com.ebisaos.domain.User.class.getName() + ".authorities");
            createCache(cm, com.ebisaos.domain.Item.class.getName());
            createCache(cm, com.ebisaos.domain.Item.class.getName() + ".stocks");
            createCache(cm, com.ebisaos.domain.Stock.class.getName());
            createCache(cm, com.ebisaos.domain.Stock.class.getName() + ".logStockItens");
            createCache(cm, com.ebisaos.domain.Stock.class.getName() + ".solicitacaoItems");
            createCache(cm, com.ebisaos.domain.Stock.class.getName() + ".solicitacaoCompras");
            createCache(cm, com.ebisaos.domain.Setor.class.getName());
            createCache(cm, com.ebisaos.domain.Setor.class.getName() + ".stocks");
            createCache(cm, com.ebisaos.domain.LogStockItens.class.getName());
            createCache(cm, com.ebisaos.domain.Municipio.class.getName());
            createCache(cm, com.ebisaos.domain.Municipio.class.getName() + ".enderecos");
            createCache(cm, com.ebisaos.domain.Endereco.class.getName());
            createCache(cm, com.ebisaos.domain.Endereco.class.getName() + ".unidades");
            createCache(cm, com.ebisaos.domain.Unidade.class.getName());
            createCache(cm, com.ebisaos.domain.Unidade.class.getName() + ".solicitacaos");
            createCache(cm, com.ebisaos.domain.Orgao.class.getName());
            createCache(cm, com.ebisaos.domain.Orgao.class.getName() + ".unidades");
            createCache(cm, com.ebisaos.domain.Solicitacao.class.getName());
            createCache(cm, com.ebisaos.domain.Solicitacao.class.getName() + ".avaliacaos");
            createCache(cm, com.ebisaos.domain.Solicitacao.class.getName() + ".solicitacaoItems");
            createCache(cm, com.ebisaos.domain.Solicitacao.class.getName() + ".solicitacaoEquipes");
            createCache(cm, com.ebisaos.domain.Avaliacao.class.getName());
            createCache(cm, com.ebisaos.domain.Avaliacao.class.getName() + ".comentarios");
            createCache(cm, com.ebisaos.domain.Comentario.class.getName());
            createCache(cm, com.ebisaos.domain.SolicitacaoCompra.class.getName());
            createCache(cm, com.ebisaos.domain.Equipe.class.getName());
            createCache(cm, com.ebisaos.domain.Equipe.class.getName() + ".solicitacaoEquipes");
            createCache(cm, com.ebisaos.domain.Colaborador.class.getName());
            createCache(cm, com.ebisaos.domain.Colaborador.class.getName() + ".equipes");
            createCache(cm, com.ebisaos.domain.Funcao.class.getName());
            createCache(cm, com.ebisaos.domain.Funcao.class.getName() + ".colaboradors");
            createCache(cm, com.ebisaos.domain.SolicitacaoEquipe.class.getName());
            createCache(cm, com.ebisaos.domain.SolicitacaoItem.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cache.clear();
        } else {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
