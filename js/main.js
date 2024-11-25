document.addEventListener('DOMContentLoaded', () => {
	const imgLightBox = document.querySelectorAll('.materialboxed');
	M.Materialbox.init(imgLightBox, {
		inDuration: 800,
		outDuration: 500
	});
});