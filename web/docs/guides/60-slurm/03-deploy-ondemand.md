# Deploy Open OnDemand

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Open OnDemand, a dashboard for SLURM, can be deployed along with the SLURM controller.

## Helm and Docker resources

The Helm resources are stored on [the ClusterFactory Git Repository](https://github.com/SquareFactory/ClusterFactory/tree/main/helm/slurm-cluster).

The Dockerfile is described in the git repository [SquareFactory/open-ondemand-docker](https://github.com/SquareFactory/open-ondemand-docker).

The Docker images can be pulled with:

```sh
docker pull ghcr.io/squarefactory/open-ondemand:latest-dex
```

:::note

You should always verify the default Helm [values](https://github.com/SquareFactory/ClusterFactory/blob/main/helm/slurm-cluster/values.yaml) before editing the `values` field of an Argo CD `Application`.

:::

Deploying Open OnDemand is very similar to [deploying the Slurm Login node](/docs/guides/slurm/deploy-slurm#6-slurm-login-deployment).

## 1. Secrets and Volumes

### SSH configuration and Home directory

This is the same as the deployment of [the Slurm Login Nodes](/docs/guides/slurm/deploy-slurm#ssh-server-configuration) but with extra steps.

### Open OnDemand secret configuration

The configuration of Open OnDemand must be stored in a secret because it could leak the LDAP password:

1. Create a `-secret.yaml.local` file:

```yaml title="argo/slurm-cluster/secrets/openondemand-portal-secret.yaml.local"
apiVersion: v1
kind: Secret
metadata:
  name: openondemand-portal-secret
  namespace: slurm-cluster
type: Opaque
stringData:
  ood_portal.yml: |
    ---
    #
    # Portal configuration
    #

    # The address and port to listen for connections on
    # Example:
    #     listen_addr_port: 443
    # Default: null (don't add any more listen directives)
    #listen_addr_port: 8080

    # The server name used for name-based Virtual Host
    # Example:
    #     servername: 'www.example.com'
    # Default: null (don't use name-based Virtual Host)

    servername: ondemand.example.com
    #ssl:
    # - 'SSLCertificateFile ""'
    # - 'SSLCertificateKeyFile ""'

    # The server name used for rewrites
    # Example:
    #     proxy_server: 'proxy.example.com'
    # Default: The value of servername
    #proxy_server: 'proxy.example.com'

    # The port specification for the Virtual Host
    # Example:
    #     port: 8080
    #Default: null (use default port 80 or 443 if SSL enabled)
    #port: 8080

    # List of SSL Apache directives
    # Example:
    # Default: null (no SSL support)
    #ssl: null

    # Root directory of log files (can be relative ServerRoot)
    # Example:
    #     logroot: '/path/to/my/logs'
    # Default: 'logs' (this is relative to ServerRoot)
    #logroot: 'logs'

    # Error log filename
    # Example:
    #     errorlog: 'error.log'
    # Default: 'error.log' (If 'servername' and 'ssl' options are defined
    # the default value will be <servername>_error_ssl.log)
    errorlog: 'error.log'

    # Access log filename
    # Example:
    #     accesslog: 'access.log'
    # Default: 'access.log' (If 'servername' and 'ssl' options are defined
    # the default value will be <servername>_access_ssl.log)
    accesslog: 'access.log'

    # Apache access log format (Don't specify log nickname see: http://httpd.apache.org/docs/current/mod/mod_log_config.html#transferlog)
    # Example:
    #     logformat: '"%v %h \"%r\" %>s %O \"%{Referer}i\" \"%{User-Agent}i\" %{SSL_PROTOCOL}x %T"'
    # Default: Apache combined format

    # Should RewriteEngine be used
    # Example:
    #     use_rewrites: false
    # Default: true
    use_rewrites: false

    # Should Maintenance Rewrite rules be added
    # Example:
    #   use_maintenance: false
    # Default: true
    #use_maintenance: true

    # List of IPs to whitelist when maintenance is enabled
    # Example:
    #   maintenance_ip_whitelist:
    #     - 192.168.0..*
    #     - 192.168.1..*
    # Default: [] (no IPs whitelisted)
    #maintenance_ip_whitelist: []

    # Set Header Content-Security-Policy frame-ancestors.
    # Example:
    #   security_csp_frame_ancestors: https://ondemand.osc.edu
    # Example to disable setting:
    #   security_csp_frame_ancestors: false
    # Default: based on servername and ssl settings
    #security_csp_frame_ancestors:

    # Set Header Strict-Transport-Security to help enforce SSL
    # Example:
    #   security_strict_transport: false
    # Default: true when ssl is enabled, false otherwise
    #security_strict_transport: false

    # Root directory of the Lua handler code
    # Example:
    #     lua_root: '/path/to/lua/handlers'
    # Default : '/opt/ood/mod_ood_proxy/lib' (default install directory of mod_ood_proxy)
    #lua_root: '/opt/ood/mod_ood_proxy/lib'

    # Verbosity of the Lua module logging
    # (see https://httpd.apache.org/docs/2.4/mod/core.html#loglevel)
    # Example:
    #     lua_log_level: 'warn'
    # Default: 'info' (get verbose logs)
    #lua_log_level: 'info'

    # Lua regular expression used to map authenticated-user to system-user
    # This configuration is ignored if user_map_cmd is defined
    # Example:
    #     user_map_match: '^([^@]+)@.*$'
    # Default: '.*'
    # user_map_match: '.*'

    # System command used to map authenticated-user to system-user
    # This option takes precedence over user_map_match
    # Example:
    #     user_map_cmd: '/usr/local/bin/ondemand-usermap'
    # Default: null (use user_map_match)
    #user_map_cmd: null

    # Use an alternative CGI environment variable instead of REMOTE_USER for
    # determining the authenticated-user fed to the mapping script
    # Example:
    #     user_env: 'OIDC_CLAIM_preferred_username'
    # Default: null (use REMOTE_USER)
    #user_env: null

    # Redirect user to the following URI if fail to map there authenticated-user to
    # a system-user
    # Example:
    #     map_fail_uri: '/register'
    # Default: null (don't redirect, just display error message)
    #map_fail_uri: null

    # System command used to run the `nginx_stage` script with sudo privileges
    # Example:
    #     pun_stage_cmd: 'sudo /path/to/nginx_stage'
    # Default: 'sudo /opt/ood/nginx_stage/sbin/nginx_stage' (don't forget sudo)
    #pun_stage_cmd: 'sudo /opt/ood/nginx_stage/sbin/nginx_stage'

    # List of Apache authentication directives
    # NB: Be sure the appropriate Apache module is installed for this
    # Default: (see below, uses OIDC auth with Dex)
    auth:
      - 'AuthType openid-connect'
      - 'AuthPAMService ood'
      - 'Require valid-user'

    #user_map_cmd: "/opt/ood/ood_auth_map/bin/ood_auth_map.regex"

    # Redirect user to the following URI when accessing root URI
    # Example:
    #     root_uri: '/my_uri'
    #     # https://www.example.com/ => https://www.example.com/my_uri
    # Default: '/pun/sys/dashboard' (default location of the OOD Dashboard app)
    #root_uri: '/pun/sys/dashboard'

    # Track server-side analytics with a Google Analytics account and property
    # (see https://github.com/OSC/mod_ood_proxy/blob/master/lib/analytics.lua for
    # information on how to setup the GA property)
    # Example:
    #     analytics:
    #       url: 'http://www.google-analytics.com/collect'
    #       id: 'UA-79331310-4'
    # Default: null (do not track)
    #analytics: null

    #
    # Publicly available assets
    #

    # Public sub-uri (available to public with no authentication)
    # Example:
    #     public_uri: '/assets'
    # Default: '/public'
    #public_uri: '/public'

    # Root directory that serves the public sub-uri (be careful, everything under
    # here is open to the public)
    # Example:
    #     public_root: '/path/to/public/assets'
    # Default: '/var/www/ood/public'
    #public_root: '/var/www/ood/public'

    #
    # Logout redirect helper
    #

    # Logout sub-uri
    # Example
    #     logout_uri: '/log_me_out'
    # NB: If you change this, then modify the Dashboard app with the new sub-uri
    # Default: '/logout' (the Dashboard app is by default going to expect this)
    #logout_uri: '/logout'

    # Redirect user to the following URI when accessing logout URI
    # Example:
    #     logout_redirect: '/oidc?logout=https%3A%2F%2Fwww.example.com'
    # Default: '/pun/sys/dashboard/logout' (the Dashboard app provides a simple
    # HTML page explaining logout to the user)
    #logout_redirect: '/pun/sys/dashboard/logout'

    #
    # Reverse proxy to backend nodes
    #

    # Regular expression used for whitelisting allowed hostnames of nodes
    # Example:
    #     host_regex: '[\w.-]+\.example\.com'
    # Default: '[^/]+' (allow reverse proxying to all hosts, this allows external
    # hosts as well)
    #host_regex: '[^/]+'

    # Sub-uri used to reverse proxy to backend web server running on node that
    # knows the full URI path
    # Example:
    #     node_uri: '/node'
    # Default: null (disable this feature)
    #node_uri: null

    # Sub-uri used to reverse proxy to backend web server running on node that
    # ONLY uses *relative* URI paths
    # Example:
    #     rnode_uri: '/rnode'
    # Default: null (disable this feature)
    #rnode_uri: null

    #
    # Per-user NGINX Passenger apps
    #

    # Sub-uri used to control PUN processes
    # Example:
    #     nginx_uri: '/my_pun_controller'
    # Default: '/nginx'
    #nginx_uri: '/nginx'

    # Sub-uri used to access the PUN processes
    # Example:
    #     pun_uri: '/my_pun_apps'
    # Default: '/pun'
    #pun_uri: '/pun'

    # Root directory that contains the PUN Unix sockets that the proxy uses to
    # connect to
    # Example:
    #     pun_socket_root: '/path/to/pun/sockets'
    # Default: '/var/run/ondemand-nginx' (default location set in nginx_stage)
    #pun_socket_root: '/var/run/ondemand-nginx'

    # Number of times the proxy attempts to connect to the PUN Unix socket before
    # giving up and displaying an error to the user
    # Example:
    #     pun_max_retries: 25
    # Default: 5 (only try 5 times)
    #pun_max_retries: 5

    # The PUN pre hook command to execute as root
    #
    # Example:
    #    pun_pre_hook_root_cmd: '/opt/hpc-site/ood_pun_prehook'
    # Default: null (do not run any PUN pre hook as root)
    #pun_pre_hook_root_cmd: null

    # Comma separated list of environment variables to pass from the apache context
    # into the PUN pre hook. Defaults to null so nothing is exported.
    #
    # Example:
    #    pun_pre_hook_exports: 'OIDC_ACCESS_TOKEN,OIDC_CLAIM_EMAIL'
    # Default: null (pass nothing)
    #pun_pre_hook_exports: null

    #
    # Support for OpenID Connect
    #

    # Sub-uri used by mod_auth_openidc for authentication
    # Example:
    #     oidc_uri: '/oidc'
    # Default: null (disable OpenID Connect support)
    #oidc_uri: null

    # Sub-uri user is redirected to if they are not authenticated. This is used to
    # *discover* what ID provider the user will login through.
    # Example:
    #     oidc_discover_uri: '/discover'
    # Default: null (disable support for discovering OpenID Connect IdP)
    #oidc_discover_uri: null

    # Root directory on the filesystem that serves the HTML code used to display
    # the discovery page
    # Example:
    #     oidc_discover_root: '/var/www/ood/discover'
    # Default: null (disable support for discovering OpenID Connect IdP)
    #oidc_discover_root: null

    #
    # Support for registering unmapped users
    #
    # (Not necessary if using regular expressions for mapping users)
    #

    # Sub-uri user is redirected to if unable to map authenticated-user to
    # system-user
    # Example:
    #     register_uri: '/register'
    # Default: null (display error to user if mapping fails)
    #register_uri: null

    # Root directory on the filesystem that serves the HTML code used to register
    # an unmapped user
    # Example:
    #     register_root: '/var/www/ood/register'
    # Default: null (display error to user if mapping fails)
    #register_root: null

    # OIDC metadata URL
    # Example:
    #     oidc_provider_metadata_url: https://example.com:5554/.well-known/openid-configuration
    # Default: null (value auto-generated if using Dex)
    #oidc_provider_metadata_url: null

    # OIDC client ID
    # Example:
    #     oidc_client_id: ondemand.example.com
    # Default: null (value auto-generated if using Dex)
    #oidc_client_id: null

    # OIDC client secret
    # Example:
    #     oidc_client_secret: 334389048b872a533002b34d73f8c29fd09efc50
    # Default: null (value auto-generated if using Dex)
    #oidc_client_secret: null

    # OIDC remote user claim. This is the claim that populates REMOTE_USER
    # Example:
    #     oidc_remote_user_claim: preferred_username
    # Default: preferred_username
    #oidc_remote_user_claim: preferred_username

    # OIDC scopes
    # Example:
    #     oidc_scope: "openid profile email groups"
    # Default: "openid profile email"
    #oidc_scope: "openid profile email"

    # OIDC session inactivity timeout
    # Example:
    #     oidc_session_inactivity_timeout: 28800
    # Default: 28800
    #oidc_session_inactivity_timeout: 28800

    # OIDC session max duration
    # Example:
    #     oidc_session_max_duration: 28800
    # Default: 28800
    #oidc_session_max_duration: 28800

    # OIDC max number of state cookies and if to automatically clean old cookies
    # Example:
    #     oidc_state_max_number_of_cookies: "10 true"
    # Default: "10 true"
    #oidc_state_max_number_of_cookies: "10 true"

    # OIDC Enable SameSite cookie
    # When ssl is defined this defaults to 'Off'
    # When ssl is not defined this defaults to 'On'
    # Example:
    #     oidc_cookie_same_site: 'Off'
    # Default: 'On'
    #oidc_cookie_same_site: 'On'

    # Additional OIDC settings as key-value pairs
    # Example:
    #     oidc_settings:
    #       OIDCPassIDTokenAs: serialized
    #       OIDCPassRefreshToken: On
    # Default: {} (empty hash)

    # Dex configurations, values inside the "dex" structure are directly used to configure Dex
    # If the value for "dex" key is false or null, Dex support is disabled
    # Dex support will auto-enable if ondemand-dex package is installed
    dex:
      # Default based on if ssl key for ood-portal-generator is defined
      ssl: false
      # Only used if SSL is disabled
      http_port: '5556'
      # Only used if SSL is enabled
      https_port: '5554'
      # tls_cert and tls_key take OnDemand configured values for ssl and copy keys to /etc/ood/dex maintaining file names
      #  tls_cert: null
      #  tls_key: null
      #  storage_file: /etc/ood/dex/dex.db
      #  grpc: null
      #  expiry: null
      # Client ID, defaults to servername or FQDN
      #  client_id: null
      #  client_name: OnDemand
      # Client secret, value auto generated
      # A value that is a filesystem path can be used to store secret in a file
      #  client_secret: /etc/ood/dex/ondemand.secret
      # The OnDemand redirectURI is auto-generated, this option allows adding additional URIs
      client_redirect_uris: ["https://ondemand.example.com/oidc"]
      # Additional Dex OIDC clients to configure
      #  static_clients: []
      # The following example is to configure OpenLDAP
      # Docs: https://github.com/dexidp/dex/blob/master/Documentation/connectors/ldap.md
      connectors:
        - type: ldap
          id: ldap
          name: LDAP
          config:
            host: ldap.example.com:636
            insecureSkipVerify: true
            bindDN: cn=admin,dc=example,dc=com
            bindPW: password
            userSearch:
              baseDN: ou=People,dc=example,dc=com
              filter: '(objectClass=posixAccount)'
              username: uid
              idAttr: uid
              emailAttr: mail
              nameAttr: cn
              preferredUsernameAttr: cn
            groupSearch:
              baseDN: ou=Group,dc=example,dc=org
              filter: '(objectClass=posixGroup)'
              userMatchers:
                - userAttr: DN
                  groupAttr: memberUid
              nameAttr: cn
    host_regex: 'cn\d+'
    node_uri: '/node'
    rnode_uri: '/rnode'
    #  frontend:
    #    theme: ondemand
    #    dir: /usr/share/ondemand-dex/web
```

Edit the file accordingly. For more information, consult the [Open OnDemand documentation](https://osc.github.io/ood-documentation/latest/reference/files/ood-portal-yml.html).

2. Seal the secret:

```shell title="user@local:/ClusterFactory"
cfctl kubeseal
```

3. Apply the SealedSecret:

```shell title="user@local:/ClusterFactory"
kubectl apply -f argo/slurm-cluster/secrets/openondemand-portal-sealed-secret.yaml
```

## 2. Values: Enable Open OnDemand

```yaml title="helm/slurm-cluster/values-<cluster name>.yaml"
ondemand:
  enabled: true
  image: ghcr.io/squarefactory/open-ondemand:2.0.28-slurm22.05-dex

  command: ['sh', '-c', 'update-ca-trust && /init']

  oodPortalSecretName: 'openondemand-portal-secret'

  hostAliases:
    - ip: '127.0.0.1'
      hostnames:
        - 'ondemand.example.com'

  sshd:
    secretName: login-sshd-secret

  config:
    nginxStage:
      pun_custom_env:
        OOD_DASHBOARD_TITLE: 'Open OnDemand'
        #OOD_BRAND_BG_COLOR: "#120641"
        #OOD_BRAND_LINK_ACTIVE_BG_COLOR: "#6753ff"
        #OOD_DASHBOARD_LOGO: "/public/logo.png"
    apps: {}
    dev: {}
    clusters:
      my-cluster:
        v2:
          metadata:
            title: 'Cluster'
          login:
            host: '127.0.0.1'
          job:
            adapter: 'slurm'
            cluster: 'ReindeerPizza'
            bin: '/usr/bin'
            conf: '/etc/slurm/slurm.conf'
            bin_overrides:
              sbatch: '/usr/bin/sbatch'
              squeue: '/usr/bin/squeue'
              scontrol: '/usr/bin/scontrol'
              scancel: '/usr/bin/scancel'
          acls:
            - adapter: 'group'
              groups:
                - 'cluster-users'
                # - "other_users_of_the_cluster"
              type: 'whitelist'
          batch_connect:
            basic:
              script_wrapper: |
                %s
            vnc:
              script_wrapper: |
                export WEBSOCKIFY_CMD="python3 -m websockify"
                export PATH="/opt/TurboVNC/bin:${PATH}"
                %s

  nodeSelector:
    topology.kubernetes.io/region: <FILL ME> # <country code>-<city>
    topology.kubernetes.io/zone: <FILL ME> # <country code>-<city>-<index>

  volumeMounts:
    - name: ldap-users-pvc
      mountPath: /home/ldap-users
    - name: ca-cert
      mountPath: /etc/pki/ca-trust/source/anchors/example.com.ca.pem
      subPath: example.com.ca.pem

  volumes:
    - name: ldap-users-pvc
      persistentVolumeClaim:
        claimName: ldap-users-<cluster name>-pvc
    - name: ca-cert
      secret:
        secretName: local-ca-secret
```

You might be also interested to mount extra configuration files:

```yaml title="Sample argo/slurm-cluster/configs/ondemand-extra-configs.yaml"
kind: ConfigMap
apiVersion: v1
metadata:
  name: ondemand-extra-configs
  namespace: slurm-cluster
data:
  bc_desktop_<cluster name>.yml: |
    title: "My Cluster"
    cluster: "<cluster name>"
    attributes:
      desktop: "xfce"
      bc_account: null
  dashboard_env: |
    MOTD_PATH="/etc/motd" # this supports both file and RSS feed URIs
    MOTD_FORMAT="txt_erb" # markdown, txt, rss, markdown_erb, txt_erb
    # don't show ssh link in batch connect card
    OOD_BC_SSH_TO_COMPUTE_NODE=off
  shell_env: |
    OOD_SHELL_ORIGIN_CHECK='off'
    OOD_SSH_WRAPPER='/usr/local/sbin/ssh_insecure'
  motd: |
    Welcome to DeepSquare for education!
  ssh_insecure: |
    #!/bin/sh

    exec /usr/bin/ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "$@"
```

```yaml title="helm/slurm-cluster/values-<cluster name>.yaml"
ondemand:
  # ...

  nodeSelector:
    topology.kubernetes.io/region: <FILL ME> # <country code>-<city>
    topology.kubernetes.io/zone: <FILL ME> # <country code>-<city>-<index>

  volumeMounts:
    - name: ldap-users-pvc
      mountPath: /home/ldap-users
    - name: ca-cert
      mountPath: /etc/pki/ca-trust/source/anchors/example.com.ca.pem
      subPath: example.com.ca.pem
    - name: ondemand-extra-configs
      mountPath: /etc/ood/config/apps/bc_desktop/<cluster name>.yml
      subPath: bc_desktop_<cluster name>.yml
    - name: ondemand-extra-configs
      mountPath: /etc/ood/config/apps/dashboard/env
      subPath: dashboard_env
    - name: ondemand-extra-configs
      mountPath: /etc/ood/config/apps/shell/env
      subPath: shell_env
    - name: ondemand-extra-configs
      mountPath: /etc/motd
      subPath: motd
    - name: ondemand-extra-configs
      mountPath: /usr/local/sbin/ssh_insecure
      subPath: ssh_insecure

  volumes:
    - name: ldap-users-pvc
      persistentVolumeClaim:
        claimName: ldap-users-<cluster name>-pvc
    - name: ca-cert
      secret:
        secretName: local-ca-secret
    - name: ondemand-extra-configs
      configMap:
        name: ondemand-extra-configs
        defaultMode: 493
```

You should also configure the Ingress:

```yaml title="helm/slurm-cluster/values-<cluster name>.yaml"
ondemand:
  # ...
  httpIngress:
    enabled: true
    annotations:
      traefik.ingress.kubernetes.io/router.entrypoints: web
    ingressClass: 'traefik'

    hosts:
      - ondemand.example.com

    tls: {}

  oidcIngress:
    enabled: true
    annotations:
      traefik.ingress.kubernetes.io/router.entrypoints: oidc
    ingressClass: 'traefik'

    hosts:
      - ondemand.example.com

    tls: {}
```

The entry point `oidc` (`5556/tcp`) must be opened on Traefik. If you are using `tls`, you should open the post `oidcs` (`5554/tcp`) and apply this Ingress instead:

```yaml title="helm/slurm-cluster/values-<cluster name>.yaml"
ondemand:
  # ...
  httpIngress:
    enabled: true
    annotations:
      cert-manager.io/cluster-issuer: selfsigned-cluster-issuer
      traefik.ingress.kubernetes.io/router.entrypoints: websecure
      traefik.ingress.kubernetes.io/router.tls: 'true'
    ingressClass: 'traefik'

    hosts:
      - ondemand.example.com

    tls:
      - secretName: ondemand.example.com-secret
        hosts:
          - ondemand.example.com

  oidcIngress:
    enabled: true
    annotations:
      cert-manager.io/cluster-issuer: selfsigned-cluster-issuer
      traefik.ingress.kubernetes.io/router.entrypoints: oidcs
      traefik.ingress.kubernetes.io/router.tls: 'true'
    ingressClass: 'traefik'

    hosts:
      - ondemand.example.com

    tls:
      - secretName: ondemand.example.com-secret
        hosts:
          - ondemand.example.com
```

You should also handle the redirection from `oidc` to `oidcs` and `http` to `https`, by using either a [middleware](https://doc.traefik.io/traefik/middlewares/http/redirectscheme/), or using an [entry point redirection](https://doc.traefik.io/traefik/routing/entrypoints/#redirection) (use the CLI configuration).

Deploy the application:

```shell
git add .
git commit -m "Added SLURM OnDemand values"
git push
```

```shell title="user@local:/ClusterFactory"
# This is optional if the application is already deployed.
kubectl apply -f argo/slurm-cluster/apps/slurm-cluster-<cluster name>-app.yaml
```

You should be able to connect to the website by using the configured URL.
