create: .vagrant/machines/manager0/libvirt/id .vagrant/machines/worker0/libvirt/id

.vagrant/machines/manager0/libvirt/id .vagrant/machines/worker0/libvirt/id: ~/.ssh/id_rsa_smoke_test
	vagrant up

~/.ssh/id_rsa_smoke_test:
	ssh-keygen -t rsa -f ~/.ssh/id_rsa_smoke_test -N ""

.PHONY: deploy-everything
deploy-everything: create
	./deploy-everything.sh

.PHONY: clean
clean:
	vagrant destroy -f
	rm -rf .vagrant/
	rm -f ~/.ssh/id_rsa_smoke_test ~/.ssh/id_rsa_smoke_test.pub
	ssh-keygen -R 192.168.77.10
	ssh-keygen -R 192.168.77.11
	ssh-keygen -R 192.168.77.10 -f ~/.ssh/known_hosts2
	ssh-keygen -R 192.168.77.11 -f ~/.ssh/known_hosts2
